import isDeepEqual from "fast-deep-equal";

export function useForm<T extends Record<string, any>>(
  initialState: T,
  saveChanges: (newState: T) => void | Promise<void>,
) {
  const resetState = reactive<T>({ ...initialState });
  const state = reactive<T>({ ...initialState });

  const hasChanges = computed(() => !isDeepEqual(state, resetState));

  return {
    state,
    hasChanges,
    reset() {
      Object.assign(state, resetState);
    },
    async saveChanges() {
      if (!hasChanges.value) return;

      try {
        // @ts-expect-error: Not sure why TS is mad
        await saveChanges(state);
        Object.assign(resetState, state);
      } catch {}
    },
  };
}
