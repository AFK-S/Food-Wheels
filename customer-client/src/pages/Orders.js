import React, { useState } from 'react'
import { Modal, Button } from '@mantine/core';
import { TextInput, Checkbox, Group, Box, Textarea, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const form = useForm({
        initialValues: {
            feedback: "",
            rate: 0,
            sector: ""
        },

    });
    const [rateModal, setRateModal] = useState(false)
    const navigate = useNavigate();
    return (
        <div className='orders'>
            <h4 className='my-3'>My Orders</h4>
            <div className="order-cards p-3">
                <div className="d-flex align-items-center justify-content-between">
                    <p>Order ID : 90909</p>
                    <p>17-02-2024</p>
                </div>
                <div className="list mt-3">
                    <p>Burger (x1)</p>
                    <p>Burger (x1)</p>
                    <p>Burger (x1)</p>
                </div>
                <button className='black-btn mt-4 p-2' onClick={() => setRateModal(true)}>Give Feedback</button>
            </div>
            <Modal opened={rateModal} onClose={() => setRateModal(false)} title="Give Feedback" className='rounded' centered>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Select
                        style={{
                            borderRadius: "20px"
                        }}
                        withAsterisk
                        className='my-3'
                        label="Sector"
                        placeholder="Pick value"
                        data={["hygiene", "taste", "experience"]}
                        {...form.getInputProps('sector')}
                    />
                    <Select
                        withAsterisk
                        style={{
                            borderRadius: "20px"
                        }}
                        className='my-3'
                        label="Rate"
                        placeholder="Pick value"
                        data={['0', '1', '2', '3', '4', '5']}
                        {...form.getInputProps('rate')}
                    />
                    <Textarea
                        className='mt-4'
                        withAsterisk
                        label="Feedback"
                        radius="md"
                        autosize
                        minRows={6}
                        placeholder="your@email.com"
                        {...form.getInputProps('feedback')}

                    />
                    <button className='black-btn mt-3'>Submit</button>
                </form>
            </Modal>
            <button className='black-btn' onClick={() => {
                navigate("/")
            }} style={{
                position: "fixed",
                bottom: "1rem",
                left: 0,
                right: 0,
                width: "90%",
                margin: "0 auto"
            }}>
                Back to Home
            </button>
        </div>
    )
}

export default Orders