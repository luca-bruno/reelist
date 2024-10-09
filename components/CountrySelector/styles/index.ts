import { StylesConfig } from "react-select"

const whiteColourStyle = { color: "white" }

const getSelectStyles = (): StylesConfig => ({
  control: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#E64833" : "rgba(0, 0, 0, 0.2)",
    borderRadius: "0.75rem",
    border: "none",
    opacity: state.isFocused ? 1 : 0.8,
    boxShadow: state.isFocused ? "0 0 0 2px rgba(251, 146, 60, 0.5)" : "none",
    "&:hover": {
      opacity: 1,
      backgroundColor: "#E64833"
    }
  }),
  menu: base => ({
    ...base,
    zIndex: 20,
    position: "absolute",
    right: 0,
    marginRight: "12px",
    backgroundColor: "#E64833",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  }),
  menuList: base => ({
    ...base,
    borderRadius: "0.75rem",
    paddingBottom: "10px"
  }),
  option: base => ({
    ...base,
    cursor: "pointer",
    borderRadius: "0.5rem",
    backgroundColor: "#E64833",
    ...whiteColourStyle,
    "&:hover": {
      backgroundColor: "#ec7b69"
    }
  }),
  placeholder: base => ({
    ...base,
    ...whiteColourStyle
  }),
  input: base => ({
    ...base,
    ...whiteColourStyle
  }),
  noOptionsMessage: base => ({
    ...base,
    ...whiteColourStyle
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    ...whiteColourStyle,
    "&:hover": {
      ...whiteColourStyle
    },
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)"
  }),
  singleValue: base => ({
    ...base,
    ...whiteColourStyle,
    "&:hover": {
      ...whiteColourStyle
    }
  }),
  loadingIndicator: base => ({
    ...base,
    ...whiteColourStyle
  })
})

export default getSelectStyles
