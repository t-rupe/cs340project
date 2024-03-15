/**
 * This is the MembersPage component. It provides a table for displaying members and dialogs for adding, editing, and deleting members.
 *
 * The component uses several components from the ShadCN UI library, including Table, TableHead, TableRow, TableHeader, TableCell, TableBody, and DeleteButton.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 *
 * The component uses the 'AddMember' component to provide a dialog for adding a member. The 'AddMember' component is displayed when the "Add Member" button is clicked.
 *
 * The component uses the 'EditMemberDialog' component to provide a dialog for editing a member. The 'EditMemberDialog' component is displayed when the "Edit" button of a member is clicked.
 *
 * The component uses the 'DeleteButton' component to provide a dialog for deleting a member. The 'DeleteButton' component is displayed when the "Delete" button of a member is clicked.
 *
 * The component receives a 'data' prop, which is an array of members to be displayed in the table. Each member has a 'member_id', 'member_first_name', 'member_last_name', 'phone_1', 'phone_2', 'street_1', 'street_2', 'city', 'state', 'country', 'zip_code', 'created_date', and 'changed_date'.
 *
 * The component maps over the 'data' array and creates a TableRow for each member. The TableRow contains TableCells that display the member's id, first name, last name, phone 1, phone 2, street 1, street 2, city, state, country, zip code, created date, and changed date.
 *
 * The component uses the 'deleteMember' function to send a request to delete a member. The 'deleteMember' function receives the member's id as a parameter.
 */
"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { DeleteButton } from "@/components/AlertDestructive";
import AddMember from "./AddMember";
import { deleteMember } from "@/app/utils/Members/deleteMember";
import EditMemberDialog from "./editMemberDialog";

type Member = {
  member_id: number;
  member_first_name: string;
  member_last_name: string;
  phone_1: string;
  phone_2: string;
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  created_date: Date;
  changed_date: Date;
};

type MemberPageProps = {
  data: Member[];
};
const MembersPage = ({ data }: MemberPageProps) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Members</h2>
          {/* Below is the component for the AddMember Dialog */}
          <AddMember />
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
            {data.map((member, index) => (
              <TableRow key={index}>
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
                <TableCell>
                  {member.created_date.toISOString().split("T")[0]}
                </TableCell>
                <TableCell>
                  {member.changed_date.toISOString().split("T")[0]}
                </TableCell>

                <TableCell className="flex justify-end">
                  {/* Below is the component for the EditmemberDialog */}
                  <EditMemberDialog member={member} />
                  {/* Below is the component for the Delete Dialog, requires an id and the delete action*/}
                  <DeleteButton
                    id={member.member_id}
                    deleteFunction={deleteMember}
                    type="Member"
                  />
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
