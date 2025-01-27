import React from "react";
import { Task } from "../models";

type detailTaskProps = {
  isOpen: boolean;
  selectedData: Task;
};
const DetailTask: React.FC<detailTaskProps> = ({ isOpen, selectedData }) => {
  return <div>DetailTask</div>;
};

export default DetailTask;
