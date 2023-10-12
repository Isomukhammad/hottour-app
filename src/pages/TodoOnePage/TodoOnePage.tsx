import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";

interface ITodoOnePageProps {
  id: string;
}

const fields: TypedField[] = [
  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 6fr",
      gap: "8px",
    },
    fields: [
      {
        type: FieldType.Div,
        fields: [
          {
            type: FieldType.Box,
            sx: {
              width: "100%",
              aspectRatio: "1/1",
              backgroundColor: "grey.800",
              backgroundImage: "url(/images/placeholder.webp)", // I couln't find how to put a profile image even if I add image key with value of url to db.json, so I put link directly here but it is the same for every todo
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
            name: "avatar",
          },
          {
            type: FieldType.Rating,
            name: "rating",
          },
        ],
      },
      {
        type: FieldType.Div,
        fields: [
          {
            type: FieldType.Line,
            title: "Profile",
          },
          {
            type: FieldType.Combo,
            name: "prefix",
            title: "Sex",
            itemList: ["Mr", "Ms"],
          },
          {
            type: FieldType.Combo,
            name: "lists",
            title: "Lists",
            itemList: [
              "Lorem ipsum dolor sit amet consectetur adipisicing elit",
              "Magnam nihil illum suscipit inventore, quos nisi voluptas autem aut sapiente doloremque totam maxime optio",
            ],
          },
          {
            type: FieldType.Div,
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
            },
            fields: [
              {
                type: FieldType.Text,
                name: "keyword",
                title: "Code phrase",
                outlined: false,
                disabled: true,
              },
              {
                type: FieldType.Checkbox,
                fieldBottomMargin: "0",
                name: "completed",
                title: "Completed",
                disabled: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: FieldType.Line,
    title: "Common info",
  },
  {
    type: FieldType.Text,
    description: "Enter your name",
    name: "firstName",
    title: "First name",
  },
  {
    type: FieldType.Text,
    description: "Enter your last name",
    name: "lastName",
    title: "Last name",
  },
  {
    type: FieldType.Text,
    description: "Enter your current age",
    name: "age",
    title: "Age",
  },
  // contact information section to show email and phone number which were in the db.json file
  {
    type: FieldType.Line,
    title: "Contact info",
  },
  {
    type: FieldType.Text,
    description: "Enter your phone number",
    name: "phonenumber",
    title: "Phone number",
  },
  {
    type: FieldType.Text,
    description: "Enter your email",
    name: "email",
    title: "Email",
  },
  {
    type: FieldType.Expansion,
    title: "Subscription",
    name: "subscription",
    description: "Enter your subscription",
    fields: [
      {
        type: FieldType.Switch,
        name: "netflix",
        title: "Netflix",
      },
      {
        type: FieldType.Switch,
        name: "amazon",
        title: "Amazon",
      },
    ],
  },
  {
    type: FieldType.Div,
    style: {
      content: " ",
    },
  },
  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
    fields: [
      {
        type: FieldType.Div,
        fields: [
          {
            type: FieldType.Line,
            title: "Job",
          },
          {
            type: FieldType.Text,
            name: "jobTitle",
            title: "Job title",
          },
          {
            type: FieldType.Text,
            name: "jobArea",
            title: "Job area",
          },
        ],
      },
      {
        type: FieldType.Div,
        fields: [
          {
            type: FieldType.Line,
            title: "Home address",
          },
          {
            type: FieldType.Text,
            name: "country",
            title: "Country",
          },
          {
            type: FieldType.Text,
            name: "city",
            title: "City",
          },
          {
            type: FieldType.Text,
            name: "state",
            title: "State",
          },
          {
            type: FieldType.Text,
            name: "address",
            title: "Address",
          },
        ],
      },
    ],
  },
];

export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [fetchApi<ITodoItem>(`/users/${id}`)] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Todo list"
          subtitle={props.todo.title}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
