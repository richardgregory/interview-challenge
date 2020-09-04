export const initialState = {
  selected: [],
  selectedDietaries: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        selected: [...state.selected, action.payload],
        selectedDietaries: {
          ...state.selectedDietaries,
          ...action.payload.dietaries.reduce(
            (acc, item) => ({
              ...acc,
              [item]: state.selectedDietaries[item]
                ? state.selectedDietaries[item] + 1
                : 1,
            }),
            {}
          ),
        },
      };
    case "remove":
      return {
        ...state,
        selected: state.selected.filter(
          (item) => item.id !== action.payload.id
        ),
        selectedDietaries: {
          ...state.selectedDietaries,
          ...action.payload.dietaries.reduce(
            (acc, item) => ({
              ...acc,
              [item]: state.selectedDietaries[item] - 1,
            }),
            {}
          ),
        },
      };
  }
};
