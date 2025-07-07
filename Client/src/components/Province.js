import React from "react";
import { ProvinceBtn } from "./index";
import { location } from "../utils/constant";



const Province = () => {

    return (
        <div className=" flex items-center gap-5 justify-center py-4">
            {location.map((item) => {

                return (
                    <ProvinceBtn
                        key={item.id}
                        name={item.name}
                        image={item.image}
                    />
                )
            })
            }
        </div>
    );
}
export default Province;