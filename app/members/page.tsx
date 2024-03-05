"use client";
import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { DeleteButton } from "@/components/AlertDestructive"; 
import DialogDemo from "@/components/EditDialog";
import AddDialog from "@/components/AddDialog";

interface Member {
  member_id: number;
  member_first_name: string;
  member_last_name: string;
  phone_1: string;
  phone_2?: string;
  street_1: string;
  street_2?: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  [key: string]: any; 
}

const MembersPage = () => {
  const [selectedMember, setSelectedMember] = React.useState(null);

  const memberFields = [
    {
      name: "member_first_name",
      label: "First Name",
      type: "text",
      defaultValue: "",
    },
    {
      name: "member_last_name",
      label: "Last Name",
      type: "text",
      defaultValue: "",
    },
    { name: "phone_1", label: "Phone 1", type: "tel", defaultValue: "" },
    {
      name: "phone_2",
      label: "Phone 2",
      type: "tel",
      optional: true,
      defaultValue: "",
    },
    { name: "street_1", label: "Street 1", type: "text", defaultValue: "" },
    {
      name: "street_2",
      label: "Street 2",
      type: "text",
      optional: true,
      defaultValue: "",
    },
    { name: "city", label: "City", type: "text", defaultValue: "" },
    { name: "state", label: "State", type: "text", defaultValue: "" },
    { name: "country", label: "Country", type: "text", defaultValue: "" },
    { name: "zip_code", label: "Zip Code", type: "text", defaultValue: "" },
   
  ];

  // Static data for Members
  const members: Member[] = [
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
  ];

  const handleEditClick = (member: any) => {
    setSelectedMember(member);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center ">
          <h2 className="text-lg font-semibold">Members</h2>
          <AddDialog fields={memberFields} />{" "}
        </div>
        <Table className="bg-white">
          <TableHeader>
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
                  <DialogDemo
                    fields={memberFields.map((field) => ({
                      ...field,
                      defaultValue:
                        member[field.name]?.toString() || field.defaultValue,
                    }))}
                  />
                  {/* @ts-ignore*/}
                  <DeleteButton />
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
