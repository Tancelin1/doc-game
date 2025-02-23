import React from 'react';
import FirestoreCrudComponent from './FirestoreCrudComponent';

export default {
  title: 'Components/FirestoreCrudComponent',
  component: FirestoreCrudComponent,
};

const Template = (args: any) => <FirestoreCrudComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const WithItems = Template.bind({});
WithItems.args = {
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const EmptyList = Template.bind({});
EmptyList.args = {
  items: [],
};
