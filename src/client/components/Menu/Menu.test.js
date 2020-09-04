import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Menu from "./";

const server = setupServer(
  rest.get("http://localhost:3000/api/items", (req, res, ctx) => {
    return res(
      ctx.json({
        items: [
          {
            id: 1001,
            name:
              "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
            dietaries: ["v", "ve", "df", "gf", "n!"],
          },
          {
            id: 1002,
            name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
            dietaries: ["gf", "df", "rsf"],
          },
          {
            id: 1003,
            name:
              "Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots",
          },
        ],
      })
    );
  })
);

describe("<Menu />", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("Should display menu", async () => {
    render(<Menu />);

    await waitFor(() => screen.getByText(/Kale/i));

    expect(screen.getByRole("heading", { name: /Kale/i })).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /Hake/i })).toBeInTheDocument();
  });

  it("Should update preview on menu selection", async () => {
    render(<Menu />);

    await waitFor(() => screen.getByText(/Kale/i));

    fireEvent.click(screen.getByRole("button", { name: /Kale/i }));

    expect(screen.getAllByRole("heading", { name: /Kale/i }).length).toEqual(2);

    fireEvent.click(screen.getByRole("button", { name: /Hake/i }));

    expect(screen.getAllByRole("heading", { name: /Hake/i }).length).toEqual(2);
  });

  it("Should not add same item twice", async () => {
    render(<Menu />);

    await waitFor(() => screen.getByText(/Kale/i));

    fireEvent.click(screen.getByRole("button", { name: /Kale/i }));

    expect(screen.getAllByRole("heading", { name: /Kale/i }).length).toEqual(2);

    fireEvent.click(screen.getByRole("button", { name: /Kale/i }));

    expect(screen.getAllByRole("heading", { name: /Kale/i }).length).toEqual(2);
  });

  it("Should update preview on remove menu item", async () => {
    render(<Menu />);

    await waitFor(() => screen.getByText(/Kale/i));

    fireEvent.click(screen.getByRole("button", { name: /Kale/i }));
    fireEvent.click(screen.getByRole("button", { name: "x" }));

    expect(screen.getAllByRole("heading", { name: /Kale/i }).length).toEqual(1);
  });

  it("Should update summary", async () => {
    render(<Menu />);

    await waitFor(() => screen.getByText(/Kale/i));

    fireEvent.click(screen.getByRole("button", { name: /Kale/i }));

    expect(screen.getByText("1 items")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) => element.textContent === "1x v1x ve1x df1x gf1x n!"
      )
    ).toBeInTheDocument();
  });

  it("Should filter menu by name", async () => {
    render(<Menu />);

    await waitFor(() => screen.getByText(/Kale/i));

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "kale" },
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("heading", { name: /Hake/i })
    );

    expect(screen.getByRole("heading", { name: /Kale/i })).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /Hake/i })
    ).not.toBeInTheDocument();
  });
});
