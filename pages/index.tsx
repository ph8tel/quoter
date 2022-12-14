import { useState } from 'react';
import { Select, NumberInput, Stepper, Button, Group, TextInput, Code, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios'
export default function AiQuiz() {
  const [active, setActive] = useState(0);

  const [prediction, setPrediction] = useState('Press the button to ask Covertron');
  const chatAi = async function () {
    setPrediction('Covertron is thinking of a reply...')
    let answer = await axios({
      method: 'get',
      url: 'https://aiquoter.herokuapp.com/ai/chat',
      params: { questiontext: form.values.chat }
    });
    form.values.chat= '';
    setPrediction(answer.data.answer)
  }
  const askAi = async function () {
    setPrediction('Covertron is thinking...')
    let answer = await axios({
      method: 'get',
      url: 'https://aiquoter.herokuapp.com/ai',
      params: form.values
    });
    setPrediction(answer.data.choices)
  }
  const form = useForm({
    initialValues: {
      lob: 'Auto',
      drivingrecord: '',
      zipcode: '90210',
      age: '35',
      sex: '',
      carcost: '',
      coverageLevel: '',
      rating: '',
      chat: ''
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
          <Select
            label="How is your driving record?"
            placeholder="Pick one"
            data={[
              { value: 'great', label: 'Great' },
              { value: 'good', label: 'Good' },
              { value: 'ok', label: 'OK' },
              { value: 'bad', label: 'Mistakes have been made' },
            ]}
            {...form.getInputProps('drivingrecord')}
          />
          <TextInput label="Your zipcode" placeholder="Where you are" {...form.getInputProps('zipcode')} />
        </Stepper.Step>

        <Stepper.Step label="About you" description="Tell us about you">
          <NumberInput
            defaultValue={35}
            placeholder="Your age"
            label="How old are you?"
            withAsterisk
            {...form.getInputProps('age')}
          />
          <Select
            label="Male or Female"
            placeholder="Male or Female?"
            data={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            {...form.getInputProps('sex')}
          />
          <Select
            label="What is your credit score?"
            placeholder="Be honest"
            data={[
              { value: 'excellent', label: '800+' },
              { value: 'great', label: '750+' },
              { value: 'ok', label: '700+' },
              { value: 'bad', label: '650+' },
              { value: 'horrid', label: 'Working on it, show me the high rates' }
            ]}
            {...form.getInputProps('rating')}
          />
        </Stepper.Step>

        <Stepper.Step label="Coverage level" description="How covered do you want to be">
          <Select
            label="How expensive is your car?"
            placeholder="No bragging, just facts. You can't impress a machine"
            data={[
              { value: '80,000', label: 'Luxury' },
              { value: '50,000', label: 'Highly' },
              { value: '35,000', label: 'Average' },
              { value: '25,000', label: 'Economy' },
              { value: '15,000', label: 'Compact' }
            ]}
            {...form.getInputProps('carcost')}
          />
          <Select
            label="How much coverage?"
            placeholder="Cheap or the works?"
            data={[
              { value: 'full', label: 'The Works' },
              { value: 'average', label: 'Decent' },
              { value: 'minimal', label: 'The cheapest I can get' },
            ]}
            {...form.getInputProps("coverageLevel")}
          />
        </Stepper.Step>

        <Stepper.Completed>
          <Button onClick={askAi}>ask Covertron</Button>
          <Code block mt="xl">
            {prediction}
          </Code>
          <Textarea
            label={'Ask Covertron a Question'}
            {...form.getInputProps('chat')}
          />
          <Button onClick={chatAi}>Chat</Button>
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