import React from "react";
import CardLayout from "../components/CardLayout";
import HeadingComponent from "../components/HeadingComponent";

const MyFavoriteRecipes = () => {
  return (
    <>
      <HeadingComponent title="My Favorite Recipes" />

      <CardLayout>
        <div className="card-body p-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Recipe</th>
                  <th>Chef</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/tailwind-css-component-profile-2@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">View</button>
                    <button className="btn btn-ghost text-error btn-xs">
                      Remove
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardLayout>
    </>
  );
};

export default MyFavoriteRecipes;
