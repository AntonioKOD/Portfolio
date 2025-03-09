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

// User List component
export const UserList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField source="createdAt" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

// User Edit component
export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="email" validate={[required(), email()]} fullWidth />
      <SelectInput
        source="role"
        choices={[
          { id: "user", name: "User" },
          { id: "admin", name: "Admin" },
        ]}
        fullWidth
      />
      <DateInput source="createdAt" fullWidth />
    </SimpleForm>
  </Edit>
)

// User Show component
export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
)

