import { ThemeProvider } from "styled-components";
import "antd/dist/antd.css";
import "../src/themes/override.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={{}}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
