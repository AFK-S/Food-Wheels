import React, { useState, useEffect } from "react";
import { TextInput, Checkbox, Textarea, Button, Group, Box, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

const NewDish = () => {
  const category = [
    "Beverages",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snacks",
  ];

  const food_type = ["veg", "non-veg", "jain"];

  const [image, setImage] = useState();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      category: "",
      food_type: "",
      is_signature: false,
      price: 0,
      discount: 0,
      coverImage: null,
    },
  });


  useEffect(() => {
    form.setFieldValue("coverImage", image);
  }, [image]);

  const finalPrice = Math.max(0, form.values.price - form.values.discount);

  return (
    <>
      <div className="c-card p-4 container-fluid">
        <h3>Add New Item</h3>

        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              <p className="fw-medium me-3">Select Dish Image <span style={{
                color: "red"
              }}>*</span></p>
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                {image ?
                  <div style={{
                    width: "150px",
                    height: "150px",
                    overflow: "hidden",
                    borderRadius: "10px",
                    marginTop: "10px"
                  }}>
                    <img src={URL.createObjectURL(image)} alt="dish" className="img-fluid" />
                  </div>

                  : null}
              </div>

            </div>

            <div className="col-md-6">
              {form.values.price !== 0 && (
                <h3>Final Price: Rs. {finalPrice}</h3>
              )}
            </div>
            <Group justify="flex-end">
              <Button type="submit" className="mt-3">
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
