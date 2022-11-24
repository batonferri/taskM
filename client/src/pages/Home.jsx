import React from "react";
import { MDBTable } from "mdb-react-ui-kit";
import TableRow from "../components/TableRow";
import TableHead from "../components/TableHead";
import { useQuery } from "../hooks/useFetch";
import { tableColumns } from "../util/tableColumns";
import Error from "../components/Error";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
const Home = () => {
  const { data: tasks, loading, error } = useQuery("/tasks");

  if (loading) return <p>loading...</p>;
  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <FilterBar />
      <MDBTable align="middle">
        <TableHead tableColumns={tableColumns} />
        {tasks?.map((task) => (
          <TableRow
            id={task.id}
            assignTo={{
              name: task.assignTo,
              email: task.assignTo_email,
              profilePic: task.assignTo_profile_pic,
            }}
            createdBy={{
              name: task.createdBy,
              email: task.createdBy_email,
              profilePic: task.createdBy_profile_pic,
            }}
            date={task.created_at}
            title={task.title}
            description={task.description}
            status={task.status}
            category={task.categoryName}
            key={task.id}
          />
        ))}
      </MDBTable>
      <Pagination />
    </>
  );
};

export default Home;
