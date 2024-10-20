import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import moment from 'moment';

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
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    backgroundColor: '#f2f2f2',
    padding: 8,
    fontWeight: 'bold',
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 8,
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
const StudentDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold' }}>Student Information</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Email</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Phone</Text>
          </View>
          {/* <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Courses</Text>
          </View> */}
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Enroll Date</Text>
          </View>
        </View>
        {/* Table Rows */}
        {data?.map((user, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{user.fullName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{user.email}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{user.phone}</Text>
            </View>
            {/* <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{user?.courses?.join(', ')}</Text>
            </View> */}
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{moment(user?.enrollDate).format("DD/MM/YYYY")}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default StudentDocument;
