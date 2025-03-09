"use client"

import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  Show,
  SimpleShowLayout,
  RichTextField,
  ArrayField,
  SingleFieldList,
  ChipField,
  required,
  minLength,
  TextArrayInput,
} from "react-admin"
import { RichTextInput } from "ra-input-rich-text"

// Project List component
export const ProjectList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

// Project Edit component
export const ProjectEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required(), minLength(3)]} fullWidth />
      <RichTextInput source="content" validate={required()} fullWidth />
      <TextInput source="imageUrl" fullWidth />
      <TextInput source="link" fullWidth />
      <TextArrayInput source="technologies"/>
    </SimpleForm>
  </Edit>
)

// Project Create component
export const ProjectCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required(), minLength(3)]} fullWidth />
      <RichTextInput source="content" validate={required()} fullWidth />
      <TextInput source="imageUrl" fullWidth />
      <TextInput source="link" fullWidth />
      <TextArrayInput source="technologies"/>
        
    </SimpleForm>
  </Create>
)

// Project Show component
export const ProjectShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <RichTextField source="content" />
      <TextField source="imageUrl" />
      <TextField source="link" />
      <ArrayField source="technologies">
        <SingleFieldList>
          <ChipField source="" />
        </SingleFieldList>
      </ArrayField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
)

