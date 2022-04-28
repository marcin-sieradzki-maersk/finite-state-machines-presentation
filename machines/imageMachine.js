import { assign, createMachine } from "xstate";

// This machine is completely decoupled from Vue
export const imageMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEsC2BDGBaDBjAFsgHZgB0YqADgC4CeAxAGICiAKgMIASA+gJICyAcUShKAe1jJqyMUREgAHoiwBGAAwrSAFhUBOLWoDMAJi0A2Q+rPGANCFqIVZ0rsMBWAOwAOD2oOfDDw8AX2C7NEwwHHQCYjJkWAAZMXQIYigmNi4+IW4AZQBVdnZmPLz5cUlpWXklBCxjNTdST39ArV1dLzVdOwcEYxUtUlNdFS83N1MvFTdzUPCMbDxCElIE5NT0zI4eAUFuZgAlI4B5I4qJKRk5JEVlNRaPQx9jMzVvD10zNyM+xGMhkMpGeWi87gCX2M3wWIAiyxiqzI+HQSRSEEgO2y+0uVRutWUhjUj0M72Mxl+lnGgzc-wQKkGIxeQzGrh+FN0sPhURWcVIKNgzAATkKxEKsXshLjrjU7nVGs5DLoFWpASZfHM6QzNICZh09KSptZQmEQEQxBj4HdudFYmsKDR+qIrtVbqA6qoNKQzJ1DFpPG4nE1XHSsB5mro3F5BuYxj0zAmuUseYi+Rt0elpa6CfUVAyXJMvO8xj4vK4VFqhiC-cYPGC3CX-cYk5FbUj+ajNhiIFn8XLCSoPKRiWovFotB5xpY6x46SZgS9JwYwVpTCoWwi7cjUcLRULe7L3Y5OsPybWKf7wZ1Z-ZEPPSIuhn4x2uNymtwe3fd6n7NCOxxOU6DhOoZDF4LjQpMRINoabgmsEQA */
  createMachine({
    context: {
      imageSrc: "",
    },
    id: "image-machine",
    initial: "empty",
    states: {
      empty: {
        on: {
          FETCH_IMG: {
            target: "isLoading",
          },
        },
      },
      isLoading: {
        on: {
          FETCH_IMG_SUCCESS: {
            actions: assign({
              imageSrc: (context, event) => event.imageSrc,
            }),
            target: "hasLoaded",
          },
          FETCH_IMG_ERROR: {
            target: "hasError",
          },
        },
      },
      hasLoaded: {
        on: {
          FETCH_IMG: {
            target: "isLoading",
          },
        },
      },
      hasError: {
        on: {
          FETCH_IMG: {
            target: "isLoading",
          },
        },
      },
    },
  });
