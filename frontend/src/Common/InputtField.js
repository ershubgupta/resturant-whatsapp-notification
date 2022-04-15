import React from "react";
import { Form } from "react-bootstrap";

export function InputtField({
  name,
  label,
  type,
  placeholder,
  required,
  register,
  errors,
  className,
  pattern,
  maxLength,
  minLength,
  fieldname,
}) {
  console.log("required", required);
  return (
    <Form.Group controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        className={className}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: required,
            message: `${fieldname} is Required`,
          },
          pattern: {
            value: pattern,
            message: `Invalid ${fieldname}`,
          },
          maxLength: {
            value: maxLength,
            message: `Invalid ${fieldname}`,
          },
          minLength: {
            value: minLength,
            message: `Invalid ${fieldname}`,
          },
        })}
      />
      {errors[name] && (
        <Form.Text className="text-danger">{errors[name].message}</Form.Text>
      )}
    </Form.Group>
  );
}

export function SelectField({
  name,
  label,
  options,
  required,
  errMsg,
  register,
  errors,
  fieldname,
}) {
  return (
    <Form.Group controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select
        className="mb-3"
        label={label}
        name={name}
        id={name}
        {...register(name, {
          required: {
            value: required,
            message: `${fieldname} is Required`,
          },
        })}
      >
        {options.map((item, index) => (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        ))}
      </Form.Select>
      {errors[name] && <Form.Text className="text-danger">{errors[name].message}</Form.Text>}
    </Form.Group>
  );
}
