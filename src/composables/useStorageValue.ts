export default function <T>(
  item: WxtStorageItem<T, any>,
): ComputedRef<T | undefined> {
  const value = ref<T>();

  // Watch
  const unwatch = item.watch((v) => {
    value.value = v;
  });
  onUnmounted(unwatch);

  // init
  item.getValue().then((v) => {
    value.value = v;
  });

  // Support setting values
  return computed<T | undefined>({
    get() {
      return value.value;
    },
    set(v) {
      const oldValue = value.value;
      value.value = v;
      void (v == null ? item.removeValue() : item.setValue(v)).catch((err) => {
        console.warn("Failed to set storage item, reverting", err);
        value.value = oldValue;
      });
    },
  });
}
