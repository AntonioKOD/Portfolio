"use client"

import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  EmailField,
  required,
  email,
} from "react-admin"

// Message List component
export const MessageList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="subject" />
      <TextField source="status" />
      <DateField source="createdAt" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

// Message Edit component
export const MessageEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="email" validate={[required(), email()]} fullWidth />
      <TextInput source="subject" validate={required()} fullWidth />
      <TextInput source="message" validate={required()} multiline rows={5} fullWidth />
      <SelectInput
        source="status"
        choices={[
          { id: "unread", name: "Unread" },
          { id: "read", name: "Read" },
          { id: "replied", name: "Replied" },
          { id: "archived", name: "Archived" },
        ]}
        fullWidth
      />
      <DateInput source="createdAt" fullWidth />
    </SimpleForm>
  </Edit>
)

// Message Show component
export const MessageShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="subject" />
      <TextField source="message" />
      <TextField source="status" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
)

