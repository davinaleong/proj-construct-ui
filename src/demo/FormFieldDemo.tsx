import {
  FormField,
  FormGroup,
  Input,
  Textarea,
  Checkbox,
  Button,
} from "../components/forms"

export default function FormFieldDemo() {
  return (
    <div className="p-8 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Form Field & Form Group Demo</h1>

      <FormGroup
        title="Basic Information"
        description="Please fill out your basic information."
      >
        <FormField label="Full Name" required>
          <Input placeholder="Enter your full name" />
        </FormField>

        <FormField
          label="Email"
          required
          error="Please enter a valid email address"
        >
          <Input type="email" placeholder="Enter your email" />
        </FormField>

        <FormField label="Bio" description="Tell us about yourself">
          <Textarea placeholder="Write a short bio..." rows={4} />
        </FormField>
      </FormGroup>

      <FormGroup
        title="Preferences"
        orientation="horizontal"
        spacing="sm"
        fieldset
      >
        <FormField>
          <Checkbox>Subscribe to newsletter</Checkbox>
        </FormField>

        <FormField>
          <Checkbox>Enable notifications</Checkbox>
        </FormField>
      </FormGroup>

      <FormField>
        <Button type="submit">Submit Form</Button>
      </FormField>
    </div>
  )
}
