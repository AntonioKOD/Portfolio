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
  DateInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  Show,
  SimpleShowLayout,
  RichTextField,
  NumberInput,
  NumberField,
  ChipField,
  SingleFieldList,
  ArrayField,
  required,
  minLength,
} from "react-admin"
import { RichTextInput } from "ra-input-rich-text"

// Template List component
export const TemplateList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="category" />
      <TextField source="price" />
      <NumberField source="downloads" />
      <DateField source="createdAt" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

// Template Edit component
export const TemplateEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required(), minLength(3)]} fullWidth />
      <RichTextInput source="content" validate={required()} fullWidth />
      <TextInput source="icon" fullWidth />
      <TextInput source="install" fullWidth />
      <SelectInput
        source="category"
        choices={[
          { id: "Dashboard", name: "Dashboard" },
          { id: "E-commerce", name: "E-commerce" },
          { id: "Portfolio", name: "Portfolio" },
          { id: "Landing Page", name: "Landing Page" },
          { id: "Blog", name: "Blog" },
          { id: "Admin", name: "Admin" },
          { id: "Mobile App", name: "Mobile App" },
        ]}
        fullWidth
      />
      <ArrayInput source="tags">
        <SimpleFormIterator>
          <TextInput source="" />
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="downloads" fullWidth />
      <SelectInput
        source="price"
        choices={[
          { id: "Free", name: "Free" },
          { id: "Premium", name: "Premium" },
        ]}
        fullWidth
      />
      <DateInput source="createdAt" fullWidth />
      <TextInput source="ImageUrl" fullWidth />
      <TextInput source="previewLink" fullWidth />
      <ArrayInput source="features">
        <SimpleFormIterator>
          <TextInput source="" fullWidth />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
)

// Template Create component
export const TemplateCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required(), minLength(3)]} fullWidth />
      <RichTextInput source="content" validate={required()} fullWidth />
      <TextInput source="icon" fullWidth />
      <TextInput source="install" fullWidth />
      <SelectInput
        source="category"
        choices={[
          { id: "Dashboard", name: "Dashboard" },
          { id: "E-commerce", name: "E-commerce" },
          { id: "Portfolio", name: "Portfolio" },
          { id: "Landing Page", name: "Landing Page" },
          { id: "Blog", name: "Blog" },
          { id: "Admin", name: "Admin" },
          { id: "Mobile App", name: "Mobile App" },
        ]}
        fullWidth
      />
      <ArrayInput source="tags">
        <SimpleFormIterator>
          <TextInput source="" />
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="downloads" defaultValue={0} fullWidth />
      <SelectInput
        source="price"
        choices={[
          { id: "Free", name: "Free" },
          { id: "Premium", name: "Premium" },
        ]}
        defaultValue="Free"
        fullWidth
      />
      <DateInput source="createdAt" defaultValue={new Date()} fullWidth />
      <TextInput source="ImageUrl" fullWidth />
      <TextInput source="previewLink" fullWidth />
      <ArrayInput source="features">
        <SimpleFormIterator>
          <TextInput source="" fullWidth />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
)

// Template Show component
export const TemplateShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <RichTextField source="content" />
      <TextField source="icon" />
      <TextField source="install" />
      <TextField source="category" />
      <ArrayField source="tags">
        <SingleFieldList>
          <ChipField source="" />
        </SingleFieldList>
      </ArrayField>
      <NumberField source="downloads" />
      <TextField source="price" />
      <DateField source="createdAt" />
      <TextField source="ImageUrl" />
      <TextField source="previewLink" />
      <ArrayField source="features">
        <SingleFieldList>
          <ChipField source="" />
        </SingleFieldList>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
)

