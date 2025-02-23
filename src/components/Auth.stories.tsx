import Auth from './Auth'; 

export default {
  title: 'Components/Auth', 
  component: Auth,
};

const Template = (args: any) => <Auth {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  email: 'user@user.com',
  password: 'user@user.com',
  loggedInEmail: 'user@user.com',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  email: '',
  password: '',
  loggedInEmail: '',
};
