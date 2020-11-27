<template>
  <v-text-field :suffix="$attrs.suffix" :outlined="$attrs.outlined" :label="label" :readonly="$attrs.readonly" :rules="$attrs.rules" v-model="localValue" @input="onInput" @change="onChange" />
</template>
<script>
import Cleave from "cleave.js";
import "cleave.js/dist/addons/cleave-phone.kz.js";
import { wait } from "../utlis";

export default {
  props: {
    label: {
      type: String
    },
    value: {
      default: undefined
    },
    // https://github.com/nosir/cleave.js/blob/master/doc/options.md
    options: {
      type: Object,
      default: () => ({})
    },
    // Set this prop to false to emit masked value
    raw: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // cleave.js instance
      cleave: null,
      // callback backup
      onValueChangedFn: null,
      localValue: null,
      localEmit: false
    };
  },
  watch: {
    /**
     * Watch for any changes in options and redraw
     *
     * @param newOptions Object
     */
    options: {
      deep: true,
      handler(newOptions) {
        if (!this.cleave) return;
        this.cleave.destroy();
        this.cleave = new Cleave(this.$el.querySelector(".v-text-field__slot input"), this.getOptions(newOptions));
        this.cleave.setRawValue(this.value);
      }
    },
    value(v) {
      if (+v === 0) {
        this.localValue = "";
      }
      if (this.localEmit) {
        this.localEmit = false;
      } else {
        this.init();
      }
    }
  },
  methods: {
    init() {
      /* istanbul ignore if */
      if (this.cleave) return;

      if (this.value) {
        this.localValue = this.value;
        this.cleave = new Cleave(this.$el.querySelector(".v-text-field__slot input"), this.getOptions(this.options));
        this.cleave.setRawValue(this.value);
      }
    },
    async onChange() {
      let val = this.localValue;
      this.$set(this, "localValue", val + "\n");
      await wait(1);
      this.$set(this, "localValue", val);
    },
    onInput(newValue) {
      if (newValue && !this.cleave) {
        this.cleave = new Cleave(this.$el.querySelector(".v-text-field__slot input"), this.getOptions(this.options));
      }
      /* istanbul ignore if */
      if (!this.cleave) return;

      // when v-model is not masked (raw)
      if (this.raw && newValue === this.cleave.getRawValue()) return;
      //  when v-model is masked (NOT raw)
      if (!this.raw && newValue === this.$el.querySelector(".v-text-field__slot input").value) return;
      // Lastly set newValue
      this.cleave.setRawValue(newValue);
    },
    /**
     * Inject our method in config options
     *
     * @param options Object
     */
    getOptions(options) {
      // Preserve original callback
      this.onValueChangedFn = options.onValueChanged;

      return Object.assign({}, options, {
        onValueChanged: this.onValueChanged
      });
    },
    /**
     * Watch for value changed by cleave and notify parent component
     *
     * @param event
     */
    onValueChanged(event) {
      this.localEmit = true;
      if (this.raw) {
        if (this.options.numeral) {
          this.$emit("input", Number(event.target.rawValue));
        } else {
          this.$emit("input", event.target.rawValue);
        }
      } else {
        this.$emit("input", event.target.value);
      }

      // Call original callback method
      if (typeof this.onValueChangedFn === "function") {
        this.onValueChangedFn.call(this, event);
      }
      this.localValue = event.target.value;
    }
  },
  mounted() {
    this.init();
  },
  /**
   * Free up memory
   */
  beforeDestroy() {
    /* istanbul ignore if */
    if (!this.cleave) return;

    this.cleave.destroy();
    this.cleave = null;
    this.onValueChangedFn = null;
  }
};
</script>
