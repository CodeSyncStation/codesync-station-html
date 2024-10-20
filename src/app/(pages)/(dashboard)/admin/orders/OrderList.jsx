import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "12.5%", // 8 columns, each taking 12.5% of the width
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    backgroundColor: '#f2f2f2',
    padding: 8,
    fontWeight: 'bold',
  },
  tableCol: {
    width: "12.5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 4,
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
});

// Create Document Component
const OrderList = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold' }}>Order Information</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Order ID</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Courses</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Email</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Phone</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Purchase Date</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Status</Text>
          </View>
        </View>
        {/* Table Rows */}
        {data.map((order, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.orderId}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.courses.join(', ')}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.studentName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.email}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.phone}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.amount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.purchaseDate}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default OrderList;
