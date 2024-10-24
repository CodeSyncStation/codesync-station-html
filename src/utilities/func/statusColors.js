const statusColors = {
  pending: "#3498db", // pending (was placed)
  accepted: "#2ecc71", // order_accepted
  payment_confirmed: "#27ae60", // partial_payment_confirmed
  analyzing: "#f1c40f", // analyzing_requirements
  req_confirmed: "#2ecc71", // requirements_confirmed
  designing: "#9b59b6", // designing_project
  implementing: "#3498db", // implementing_project
  testing: "#8e44ad", // testing_project
  test_done: "#16a085", // testing_completed
  review_done: "#1abc9c", // client_review_completed
  final_payment_pending: "#e67e22", // final_payment_pending
  delivered: "#2ecc71", // delivered
  cancelled: "#95a5a6", // cancelled
};

export default statusColors;
