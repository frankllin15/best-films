import React, { Component } from "react";
import Select from "react-select";
import styled from "styled-components";

const Label = styled.label`
  font-size: 1.2em;
  color: #c4c4c4;
`;

const stylesOption = {
  control: (styles) => ({ ...styles, backgroundColor: "#ebebeb" }),
  option: (styles) => {
    return {
      ...styles,
      color: "#2e2e2e",
      cursor: "pointer",
    };
  },
};

export default function CustomSelect({
  options,
  label,
  onchange,
  name,
  className,
  placeHolder,
}) {
  return (
    <div className={className} style={{ width: "170px", marginLeft: "12px" }}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        placeholder={placeHolder || ""}
        isSearchable={false}
        id={name}
        instanceId={name}
        onChange={(e) => onchange(e, name)}
        name={name}
        styles={stylesOption}
        options={options}
      />
    </div>
  );
}
