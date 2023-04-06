import request from "@/utils/request";

export default function listConfiguration(params) {
  return request({
    method: "get",
    url: "/service/config/configuration/list",
    params,
  })
}