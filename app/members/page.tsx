import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const MembersPage = () => {
  // Static data for Members
  const members = [
    {
      member_id: 1,
      member_first_name: "John",
      member_last_name: "Doe",
      phone_1: "123-456-7890",
      phone_2: "",
      street_1: "123 Main St",
      street_2: "",
      city: "Anytown",
      state: "AN",
      country: "USA",
      zip_code: "12345",
      created_date: "2023-01-01",
      changed_date: "2023-01-02",
    },
    // Add more member objects here
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-center text-black font-semibold text-lg py-2"
                colSpan={12}
              >
                Members Table
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone 1</TableHead>
              <TableHead>Phone 2</TableHead>
              <TableHead>Street 1</TableHead>
              <TableHead>Street 2</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Zip Code</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Changed Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.member_id}>
                <TableCell>{member.member_id}</TableCell>
                <TableCell>{member.member_first_name}</TableCell>
                <TableCell>{member.member_last_name}</TableCell>
                <TableCell>{member.phone_1}</TableCell>
                <TableCell>{member.phone_2}</TableCell>
                <TableCell>{member.street_1}</TableCell>
                <TableCell>{member.street_2}</TableCell>
                <TableCell>{member.city}</TableCell>
                <TableCell>{member.state}</TableCell>
                <TableCell>{member.country}</TableCell>
                <TableCell>{member.zip_code}</TableCell>
                <TableCell>{member.created_date}</TableCell>
                <TableCell>{member.changed_date}</TableCell>
                <TableCell className="flex justify-end">
                  <Button className="mr-2" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default MembersPage;
