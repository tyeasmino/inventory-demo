import { Collapse } from "@/app/_components/common/Collapse";

import {
  Button,
  InputGroupe,
  QueryBoundary,
} from "@/app/_components/common/Index";
import { userFetchClient } from "@/app/_fetch/fetchData";
import React, { use } from "react";
import AddressForm from "./_compoenets/AddressForm";
import UserInfoForm from "./_compoenets/UserInfoForm";
import DefaultBtn from "./_compoenets/DefaultBtn";
import { AddAddress, Delete, Edit } from "./_compoenets/AdderssActions";
import Pagination from "./_compoenets/Pagination";

const page = ({ searchParams }) => {
  const { page = 1 } = use(searchParams);
  return (
    <div className=" space-y-20">
      <Collapse
        defaultOpen
        className={"border-b border-[#7B6198] pb-3"}
        title={<p className="text-2xl font-extrabold">Personal info</p>}
      >
        <UserInfo />
      </Collapse>

      <div className="mt-6 md:mt-10 space-y-6 md:space-y-10 ">
        <Address page={page} />
      </div>
    </div>
  );
};

export default page;

function KeyValue({ label, value }) {
  return (
    <tr>
      <td>{label}</td>
      <td className="px-2.5">:</td>
      <td>{value}</td>
    </tr>
  );
}

function Address({ page }) {
  const {
    data: { count, results } = {},
    status,
    message,
  } = use(userFetchClient(`/client/addresses/?page=${page}`)) || {};

  return (
    <>
      <Collapse
        className={"border-b border-[#7B6198] pb-3"}
        title={<p className="text-2xl font-extrabold">Address info</p>}
      >
        <div className="mt-6 md:mt-10 space-y-6 md:space-y-10 ">
          <QueryBoundary status={status} errorMsg={message} count={count}>
            {results?.map((addressData) => {
              const {
                id,
                first_name,
                last_name,
                company,
                address,
                city,
                state,
                zip_code,
                phone,
                is_default,
                user,
              } = addressData || {};
              return (
                <div
                  key={id}
                  className="flex flex-wrap md:flex-nowrap gap-8 justify-between items-center"
                >
                  {/* <div className="grid grid-cols-[1fr_fit-content(1ch)_1fr] items-start gap-x-2 text-[#D5BBF2] truncate"> */}
                  <table className="text-[#D5BBF2] truncate">
                    <tbody>
                      <KeyValue label={"Name"} value={first_name + last_name} />
                      <KeyValue label={"Company"} value={company} />
                      <KeyValue label={"Address"} value={address} />
                      <KeyValue label={"City"} value={city} />
                      <KeyValue label={"Phone"} value={phone} />
                    </tbody>
                  </table>
                  {/* </div> */}

                  <DefaultBtn is_default={is_default} id={id} />
                  <div className="flex gap-5">
                    <Edit address={addressData} />
                    <Delete id={id} />
                  </div>
                </div>
              );
            })}
            {count > 10 && <Pagination totalPage={Math.ceil(count / 10)} />}
          </QueryBoundary>
          <AddAddress />
        </div>
      </Collapse>
    </>
  );
}

function UserInfo() {
  const { data } = use(userFetchClient(`/api/myDetails/`));
  return <UserInfoForm initialData={data} />;
}
