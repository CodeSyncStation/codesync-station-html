import OrderRequestForm from "@/Components/form/OrderRequestForm";

export const metadata = {
  title: "Order Request Form || CodeSync Station",
  description: "",
};

export default function page() {
  return (
    <div className="container form-container">
      <h2 className="title">
        <span className="text-primary">Order</span> Request{" "}
        <span className="text-primary">Form</span>
      </h2>
      <p className="description">
        Please fill out the form below to request a quote for our services.
      </p>
      <OrderRequestForm />
    </div>
  );
}
