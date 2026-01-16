import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <View style={styles.headerText}>
          <Text style={styles.name}>User Name</Text>
          <Text style={styles.meta}>Age: 68</Text>
          <Text style={styles.condition}>Early Stage Dementia</Text>
        </View>
      </View>

      {/* PERSONAL INFO */}
      <Section title="Personal Information">
        <Info label="Gender" value="Male" />
        <Info label="Blood Group" value="O+" />
        <Info label="Emergency Contact" value="+91 98765 43210" />
      </Section>

      {/* CAREGIVER */}
      <Section title="Caregiver Details">
        <Info label="Name" value="Ramesh Kumar" />
        <Info label="Relationship" value="Son" />
        <Info label="Phone" value="+91 98765 43210" />
      </Section>

      {/* HEALTH */}
      <Section title="Health Overview">
        <Info label="Medication Adherence" value="Good" />
        <Info label="Hydration Level" value="5 / 8 glasses" />
        <Info label="Mood Trend" value="Improving" />
      </Section>

      {/* LOCATION */}
      <Section title="Location Status">
        <Info label="Current Location" value="At Home" />
        <Info label="Last Updated" value="10 minutes ago" />
      </Section>

    </ScrollView>
  );
}

/* SMALL COMPONENTS */

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Info = ({ label, value }: any) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },

  headerText: {
    marginLeft: 16,
    justifyContent: "center",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  meta: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },

  condition: {
    fontSize: 14,
    color: "#2563EB",
    marginTop: 4,
    fontWeight: "600",
  },

  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  label: {
    fontSize: 14,
    color: "#6B7280",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
});
