import { StylesConfig } from "react-select"

const whiteColourStyle = { color: "white" }

const getFilterSelectStyles = (): StylesConfig => ({
  control: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#eaeaea" : "white",
    borderRadius: "0.75rem",
    border: "none",
    boxShadow: state.isFocused ? "0 0 0 2px #E64833" : "none",
    "&:hover": {
      backgroundColor: "#eaeaea"
    }
  }),
  menu: base => ({
    ...base,
    backgroundColor: "#eaeaea",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  }),
  menuList: base => ({
    ...base,
    borderRadius: "0.75rem",
    paddingBottom: "10px"
  }),
  option: (base, state) => ({
    ...base,
    cursor: "pointer",
    borderRadius: "0.5rem",
    backgroundColor: state.isSelected ? "#E64833" : "#eaeaea",
    "&:hover": {
      backgroundColor: "#ec7b69",
      color: "white"
    }
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#808088",
    "&:hover": {
      color: "#808088"
    },
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)"
  }),
  singleValue: base => ({
    ...base,
    text: "black"
  }),
  loadingIndicator: base => ({
    ...base,
    ...whiteColourStyle
  }),
  multiValue: base => ({
    ...base,
    background: "#E64833",
    borderRadius: "0.5rem",
    color: "white"
  }),
  multiValueLabel: base => ({
    ...base,
    color: "white"
  }),
  multiValueRemove: base => ({
    ...base,
    borderTopRightRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem"
  })
})

export default getFilterSelectStyles
