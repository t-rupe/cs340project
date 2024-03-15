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
