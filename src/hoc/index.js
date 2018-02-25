export default () => (component) => {
  // eslint-disable-next-line no-param-reassign
  component.getInitialProps = () => ({});
  return component;
};
