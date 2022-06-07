import {
  FieldError,
  Form,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for the feedback!')
      formMethods.reset()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const onSubmit = async (data) => {
    console.log('🚀 ~ file: ContactPage.js ~ line 6 ~ onSubmit ~ data', data)
    create({
      variables: {
        input: data,
      },
    })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />

      <Form
        onSubmit={onSubmit}
        formMethods={formMethods}
        error={error}
        config={{ mode: 'onBlur' }}
      >
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              // value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField name="message" validation={{ required: true }} />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Send Message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
