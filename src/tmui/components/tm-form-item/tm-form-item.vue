<template>
  <view :class="[`mx-${props.margin[0]}`]">
    <tm-sheet
      :transprent="props.transprent !== null ? props.transprent : tmFormTransprent"
      :round="props.round"
      :margin="[0, 0]"
      :padding="props.padding"
    >
      <view :class="[`py-${props.margin[1]}`]">
        <view v-if="props.showError" style="height: 30rpx"> </view>
        <view
          :class="[
            'flex',
            tmFormLayout == 'horizontal' ? 'flex-row ' : 'flex-col ',
            tmFormLayout == 'horizontal' && !props.align ? 'flex-row-center-start' : '',
            tmFormLayout == 'vertical' && !props.align ? 'flex-col-center-start' : '',
            props.align,
            props.parentClass,
          ]"
        >
          <view
            v-if="_label"
            :style="[{ width: tmFormLabelWidth + 'rpx' }]"
            class="mr-32 flex flex-row"
            :class="[
              tmFormLabelAlign == 'right' ? 'flex-row-center-end' : '',
              tmFormLayout != 'horizontal' ? 'mb-24' : '',
            ]"
          >
            <tm-text v-if="_required" color="red" :font-size="30" label="*"></tm-text>
            <tm-text
              :color="
                tmFormFun == 'validate' &&
                item.isRequiredError == true &&
                props.requiredTitleChangeColor
                  ? 'red'
                  : ''
              "
              :font-size="30"
              :label="_label"
            ></tm-text>
          </view>
          <view
            class="flex-1"
            :style="[tmFormLayout == 'horizontal' ? { width: '0px' } : '']"
          >
            <slot></slot>
          </view>
        </view>
        <view :class="props.desc ? 'pt-12' : ''">
          <slot name="desc">
            <tm-text color="grey-darken-2" :font-size="22" :label="props.desc"></tm-text>
          </slot>
        </view>
        <view v-if="props.showError" style="height: 30rpx">
          <tm-text
            v-if="tmFormFun == 'validate' && item.isRequiredError == true"
            color="red"
            :font-size="22"
            :label="item.message"
          ></tm-text>
        </view>
      </view>
    </tm-sheet>
    <view v-if="tmFormBorder">
      <tm-divider :border="2" :padding="[0, 0]" :margin="[0, 0]"></tm-divider>
    </view>
  </view>
</template>
<script lang="ts" setup>
/**
 * 表单项目
 * @description 只能放置在tm-from里面，不限层级。但不能嵌套使用。
 */
import {
  computed,
  watch,
  PropType,
  provide,
  ref,
  getCurrentInstance,
  onUnmounted,
  Ref,
  inject,
  isProxy,
  toRaw,
  ComputedRef,
  onMounted,
  nextTick,
} from "vue";
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmText from "../tm-text/tm-text.vue";
import tmDivider from "../tm-divider/tm-divider.vue";
import { rulesItem, inputPushItem } from "./interface";
import { formItem } from "./../tm-form/interface";
const proxy = getCurrentInstance()?.proxy ?? null;
const tmFormComnameFormItem = "tmFormComnameFormItem";
const props = defineProps({
  parentClass: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  //表单描述
  desc: {
    type: String,
    default: "",
  },
  margin: {
    type: Array as PropType<Array<number>>,
    default: () => [12, 12],
  },
  padding: {
    type: Array as PropType<Array<number>>,
    default: () => [0, 0],
  },
  //如果在forom绑定的model为深层对象，这里的名称需要如下:
  //比如model = {a:2,b:{c:333}}
  //如果想绑定c,则field = "b.c"
  field: {
    type: String,
    default: "",
  },
  //表彰底部的单项注意说明。
  help: {
    type: String,
    default: "",
  },
  //是否必填
  required: {
    type: Boolean,
    default: false,
  },
  //检验规则
  rules: {
    type: [Object, Array] as PropType<Array<rulesItem> | rulesItem>,
    default: () => {
      return [{ validator: false, required: false }];
    },
  },
  //显示下划线。
  border: {
    type: Boolean,
    default: null,
  },
  showError: {
    type: Boolean,
    default: true,
  },
  //校验不通过时，是否让标题跟着变化文字颜色，默认是。
  requiredTitleChangeColor: {
    type: Boolean,
    default: false,
  },
  transprent: {
    type: [Boolean, String],
    default: null,
  },
  round: {
    type: Number,
    default: 0,
  },
});
const item: Ref<formItem> = ref({
  label: "", //标签名称。
  field: props.field, //字段名称key.
  value: null,
  isRequiredError: false, //true,错误，false正常 检验状态
  message: "", //检验信息提示语。
  id: uni.$tm.u.getUid(1), //表单唯一标识id
  componentsName: "", //表单组件类型。
});
const _required = ref(props.required);
const tmFormLabelWidth = inject(
  "tmFormLabelWidth",
  computed(() => 100)
);
const tmFormLabelAlign = inject(
  "tmFormLabelAlign",
  computed(() => "left")
);
const tmFormLayout = inject(
  "tmFormLayout",
  computed(() => "horizontal")
);
const tmFormBorder_inject = inject(
  "tmFormBorder",
  computed(() => true)
);
const tmFormTransprent = inject(
  "tmFormTransprent",
  computed(() => false)
);

const tmFormBorder = computed(() => {
  if (props.border !== null && typeof props.border === "boolean") return props.border;
  return tmFormBorder_inject.value;
});
const _label = computed(() => props.label);
//父级方法。
let parent: any = proxy?.$parent;
while (parent) {
  if (parent?.tmFormComnameId == "tmFormId" || !parent) {
    break;
  } else {
    parent = parent?.$parent ?? undefined;
  }
}

//卸载后需要清空。
onUnmounted(() => {
  delCom();
});
provide(
  "tmFormItemRules",
  computed(() => {
    let defaultrs: Array<rulesItem> = [];
    if (Array.isArray(props?.rules)) {
      props?.rules.forEach((el) => {
        let isreq = el?.required || props.required;
        defaultrs.push({
          message: el?.message ?? "请填写必要的内容",
          required: isreq,
          validator: el?.validator ?? false,
        });
      });
    } else {
      defaultrs = [
        {
          message: props?.rules?.message ?? "请填写必要的内容",
          required: props.rules?.required || props.required,
          validator: props.rules?.validator ?? false,
        },
      ];
    }
    return defaultrs;
  })
);
const Rules = computed(() => {
  let defaultrs: Array<rulesItem> = [];
  if (Array.isArray(props?.rules)) {
    props?.rules.forEach((el) => {
      let isreq = el?.required || props.required;
      defaultrs.push({
        message: el?.message ?? "请填写必要的内容",
        required: isreq,
        validator: el?.validator ?? false,
      });
    });
  } else {
    defaultrs = [
      {
        message: props?.rules?.message ?? "请填写必要的内容",
        required: props.rules?.required || props.required,
        validator: props.rules?.validator ?? false,
      },
    ];
  }
  return defaultrs;
});
//向父级推表单类组件。
function pushCom(itemComval?: inputPushItem) {
  if (parent) {
    item.value = { ...item.value, ...(itemComval ?? {}) };
    parent.pushKey({ ...item.value });
  }
}
function delCom() {
  if (parent) {
    parent.delKey(item.value);
  }
}

const tmFormFun = inject(
  "tmFormFun",
  computed(() => "")
);
defineExpose({ pushCom, delCom, tmFormComnameFormItem });

// 验证优化如下:
/**
 * 从3.0.86开始,验证不与子组件挂勾,只验证绑定到form中的vmodel数据中的formitem中的filed字段.
 * 这样的改变意味着,传统的cell或者只用展示的view组件,只要提供了filed就能验证,无需特定Input,upload这样的
 * 组件才能进行验证.大大的提高了移动端的表单验证效率,特别适合大量的不同类型数据组件的验证规则.
 */
const formCallFiled: ComputedRef<any> = inject(
  "formCallFiled",
  computed(() => {})
);
const nowValue = computed(() => {
  return getObjectVal(formCallFiled.value, props.field);
});
let tid = NaN;
// let flatFormValue:any = {}
watch(
  () => nowValue.value,
  () => {
    if (_required.value) {
      clearTimeout(tid);
      tid = setTimeout(async () => {
        item.value = { ...(await checkVal()) };
        nextTick(() => {
          pushCom();
        });
      }, 300);
    }
  },
  { deep: true }
);

const validate = (rules: Array<rulesItem>, value: any) => {
  rules = rules.map((el) => {
    if (typeof el.validator === "function" && el.required === true) {
      return el;
    } else if (typeof el.validator === "boolean" && el.required === true) {
      return {
        ...el,
        validator: (val: any) => {
          if (val === null || val === "" || typeof val == "undefined") return false;
          if (typeof val === "object") {
            if (Array.isArray(val)) {
              if (val.length == 0) return false;
            } else if (Object.keys(val).length === 0 && val.constructor === Object) {
              return false;
            }
          }
          if (typeof val === "boolean") {
            return val;
          }
          if (typeof val === "number") {
            if (isNaN(val)) return false;
            if (Number(val) < 0) return false;
          }
          if (typeof val === "string") {
            if (val.trim().length == 0) return false;
          }
          return true;
        },
      };
    } else {
      return {
        ...el,
        validator: (val: string | number) => {
          return true;
        },
      };
    }
  });
  let rules_filter: Array<rulesItem> = rules.filter((el) => {
    return typeof el.validator === "function" && el.required === true;
  });
  let rules_fun: Array<Promise<rulesItem>> = rules_filter.map((el) => {
    return new Promise(async (res, rej) => {
      if (typeof el.validator === "function") {
        let vr = await el.validator(value);
        if (vr) {
          res({
            message: String(el.message),
            validator: true,
          });
        } else {
          rej({
            message: el.message,
            validator: false,
          });
        }
      } else {
        res({
          message: el.message,
          validator: true,
        });
      }
    });
  });

  return Promise.all(rules_fun);
};

function checkVal(): Promise<formItem> {
  return new Promise((resolve, reject) => {
    validate(Rules.value, getObjectVal(formCallFiled.value, props.field))
      .then((rulst) => {
        resolve({ ...item.value, isRequiredError: false });
      })
      .catch((err) => {
        resolve({ ...item.value, isRequiredError: !err.validator, message: err.message });
      });
  });
}

onMounted(() => {
  //预先推送。
  checkVal().then((elitem) => pushCom({ ...elitem }));
});

//--------------以下是专门为form表单专用------------------

watch(tmFormFun, () => {
  if (tmFormFun.value == "validate") {
    if (_required.value) {
      validate(Rules.value, getObjectVal(formCallFiled.value, props.field))
        .then((rulst) => {
          item.value.isRequiredError = false;
        })
        .catch((err) => {
          item.value.message = err.message;
          item.value.isRequiredError = !err.validator;
        });

      pushCom();
    }
  }
  if (tmFormFun.value == "reset") {
  }
  if (tmFormFun.value == "clearValidate") {
    item.value.isRequiredError = false;
  }
});

//-------------- end ------------------

/**通过扁平的字段来设置json的值. */
function setObjectVal(obj: any, field = "", val: any) {
  if (field == "") return obj;
  var arr = field.split(".");
  while (arr.length > 1) {
    let key = String(arr.shift());
    obj = isProxy(obj[key]) ? toRaw(obj[key]) : obj[key];
  }
  return (obj[arr[0]] = isProxy(val) ? toRaw(val) : val);
}
function getObjectVal(obj: any, field = "") {
  if (field == "") return obj;
  var arr = field.split(".");
  while (arr.length > 1) {
    let key = String(arr.shift());
    obj = toRaw(obj[key]);
  }
  return toRaw(obj[arr[0]]);
}

function parseJson2Form(prefix: string, JsonObject: any) {
  var realPrefix = prefix;
  var resObj: any = {};
  var gettype = Object.prototype.toString;
  for (var Key in JsonObject) {
    var tmpVal = JsonObject[Key];
    var typeStr = gettype.call(tmpVal);

    if (tmpVal == null || tmpVal == undefined) {
      resObj[realPrefix + "." + Key] = "";
    } else {
      if (
        typeStr == "[object String]" ||
        typeStr == "[object Number]" ||
        typeStr == "[object Boolean]" ||
        typeStr == "[object Null]" ||
        typeStr == "[object Undefined]"
      ) {
        resObj[realPrefix + "." + Key] = tmpVal + "";
      } else if (typeStr == "[object Object]") {
        _recursive_parseJson2Form_(resObj, realPrefix + "." + Key, tmpVal);
      } else if (typeStr == "[object Array]") {
        if (tmpVal.length <= 0) {
          resObj[realPrefix + "." + Key] = "";
        } else {
          var isSimpleArray = false;
          for (var arrIndex in tmpVal) {
            var childItem = tmpVal[arrIndex];
            var childTypeStr = gettype.call(childItem);
            if (
              childTypeStr == "[object String]" ||
              childTypeStr == "[object Number]" ||
              childTypeStr == "[object Boolean]" ||
              childTypeStr == "[object Null]" ||
              childTypeStr == "[object Undefined]"
            ) {
              isSimpleArray = true;
            }
          }
          if (isSimpleArray) {
            resObj[realPrefix + "." + Key] = tmpVal.join(",");
          } else {
            var nowIndex = 0;
            for (var arrIndex in tmpVal) {
              var childItem = tmpVal[arrIndex];
              _recursive_parseJson2Form_(
                resObj,
                realPrefix + "." + Key + "[" + nowIndex + "]",
                childItem
              );
              nowIndex++;
            }
          }
        }
      }
    }
  }

  return resObj;
}
function _recursive_parseJson2Form_(resObj: any, parentKey: string, JsonObject: any) {
  var gettype = Object.prototype.toString;
  for (var Key in JsonObject) {
    var tmpVal = JsonObject[Key];

    var typeStr = gettype.call(tmpVal);
    /*

        "[object String]";
        "[object Number]";
        "[object Boolean]"
        "[object Undefined]"
        "[object Null]"
        "[object Object]"
        "[object Array]"
        "[object Function]"
        */
    if (tmpVal == null || tmpVal == undefined) {
      resObj[parentKey + "." + Key] = "";
    } else {
      if (
        typeStr == "[object String]" ||
        typeStr == "[object Number]" ||
        typeStr == "[object Boolean]" ||
        typeStr == "[object Null]" ||
        typeStr == "[object Undefined]"
      ) {
        resObj[parentKey + "." + Key] = tmpVal + "";
      } else if (typeStr == "[object Object]") {
        _recursive_parseJson2Form_(resObj, parentKey + "." + Key, tmpVal);
      } else if (typeStr == "[object Array]") {
        if (tmpVal.length <= 0) {
          resObj[parentKey + "." + Key] = "";
        } else {
          var isSimpleArray = false;
          for (var arrIndex in tmpVal) {
            var childItem = tmpVal[arrIndex];
            var childTypeStr = gettype.call(childItem);

            if (
              childTypeStr == "[object String]" ||
              childTypeStr == "[object Number]" ||
              childTypeStr == "[object Boolean]" ||
              childTypeStr == "[object Null]" ||
              childTypeStr == "[object Undefined]"
            ) {
              isSimpleArray = true;
            }
          }
          if (isSimpleArray) {
            resObj[parentKey + "." + Key] = tmpVal.join(",");
          } else {
            var nowIndex = 0;
            for (var arrIndex in tmpVal) {
              var childItem = tmpVal[arrIndex];
              _recursive_parseJson2Form_(
                resObj,
                parentKey + "." + Key + "[" + nowIndex + "]",
                childItem
              );
              nowIndex++;
            }
          }
        }
      }
    }
  }
}
</script>

<style></style>
