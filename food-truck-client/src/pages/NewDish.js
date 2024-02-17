import React, { useState, useEffect } from "react";
import {
  TextInput,
  Checkbox,
  Textarea,
  Button,
  Group,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const NewDish = () => {
  const category = ["starter", "main course", "dessert"];

  const food_type = ["veg", "non-veg", "jain"];

  const [image, setImage] = useState();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      category: "",
      food_type: "",
      price: 0,
      discount: 0,
      is_signature: false,
    },
  });

  const finalPrice = Math.max(0, form.values.price - form.values.discount);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.values.name);
      formData.append("description", form.values.description);
      formData.append("category", form.values.category);
      formData.append("food_type", form.values.food_type);
      formData.append("price", form.values.price);
      formData.append("discount", finalPrice);
      formData.append("coverImage", image);
      formData.append("is_signature", form.values.is_signature);
      const { data } = await axios.post("/api/dish", formData);
      console.log(data);
      form.reset();
      setImage(null);
    } catch (err) {
      alert(err.response?.data?.message || err.message || err);
    }
  };

  return (
    <>
      <div className="c-card p-4 container-fluid">
        <h3>Add New Dish</h3>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="row mt-2 gy-3">
            <div className="col-md-6">
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Enter Dish Name"
                {...form.getInputProps("name")}
              />
            </div>
            <div className="col-md-6">
              <Select
                withAsterisk
                label="Category"
                placeholder="Select Category"
                data={category}
                {...form.getInputProps("category")}
              />
            </div>

            <div className="col-md-6 ">
              <Textarea
                withAsterisk
                label="Dish Description"
                placeholder="Describe the dish"
                {...form.getInputProps("description")}
              />
            </div>
            <div className="col-md-6">
              <Select
                withAsterisk
                label="Food Type"
                placeholder="Select Food Type"
                data={food_type}
                {...form.getInputProps("food_type")}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                type="number"
                withAsterisk
                label="Price"
                placeholder="Enter Price"
                {...form.getInputProps("price")}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                type="number"
                withAsterisk
                label="Discount"
                placeholder="Enter Discount"
                {...form.getInputProps("discount")}
              />
            </div>

            <div className="col-md-6 d-flex">
              <p className="fw-medium me-3">
                Select Dish Image{" "}
                <span
                  style={{
                    color: "red",
                  }}
                >
                  *
                </span>
              </p>
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                {image ? (
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="dish"
                      className="img-fluid"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              {form.values.price !== 0 && (
                <h3>Final Price: Rs. {finalPrice}</h3>
              )}
              <Checkbox
                mt="md"
                label="Is Signature Dish"
                {...form.getInputProps("is_signature", { type: "checkbox" })}
              />
            </div>

            <Group justify="flex-end">
              <Button type="submit" className="black-btn mt-3" style={{
                width: "100px"
              }}>
                Submit
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewDish;
