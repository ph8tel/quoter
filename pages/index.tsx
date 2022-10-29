// @ts-nocheck
import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios'
export default function Demo() {
  const [active, setActive] = useState(0);
  const [asked, setAsked] = useState(false);
  const [prediction, setPrediction] = useState('Gathering Info');
  const [formState, setFormState] = useState({});
  const askAi = async function () {
    let answer = await axios({
      method: 'get',
      url: 'https://aiquoter.herokuapp.com/ai',
      params: form.values
    });
    console.log('yo0', answer.data.choices)
    setPrediction(answer.data.choices)
    }
  const form = useForm({
    initialValues: {
      lob: 'Home or Auto',
      zipcode: '90210',
      age: '',
      sex: '',
      assetValue: '',
      coverageLevel: '',
      rating: ''
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


  return (
    <>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="What and Where" description="What you want to insure and where">
          <TextInput label="Type of Insurance" placeholder="Home or Auto" {...form.getInputProps('lob')} />
          <TextInput label="Your zipcode" placeholder="Where you are" {...form.getInputProps('zipcode')} />
        </Stepper.Step>

        <Stepper.Step label="About you" description="Tell us about you">
          <TextInput label="Age" placeholder="0-111" {...form.getInputProps('age')} />
          <TextInput label="Sex" placeholder="Male or Female" {...form.getInputProps('sex')} />
          <TextInput mt="md" label="rating" placeholder="Be real, what is your credit score?" {...form.getInputProps('rating')} />
        </Stepper.Step>

        <Stepper.Step label="Coverage level" description="How covered do you want to be">
          <TextInput mt="md" label="assetValue" placeholder="How expensive is your asset?" {...form.getInputProps('assetValue')} />
          <TextInput mt="md" label="coverageLevel" placeholder="How much coverage do you want?" {...form.getInputProps('coverageLevel')} />
        </Stepper.Step>
        <Stepper.Completed>
          <Button onClick={askAi}>ask Covertron</Button>
          {prediction}
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    
    </>
  );
}