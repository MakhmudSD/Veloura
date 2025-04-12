console.log("Users frontend javascript file");

$(function () {
  $(".member-status").on("change", function (e) {
    const id = e.target.id; // targeted id in the event

    const memberStatus = $(`#${id}.member-status`).val();

    //TODO: axios updateChosenUser
    axios
      .post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
      })
      .then((response) => {
        console.log("response:", response);
        const result = response.data; //data is the object sent by backend
        if (result.data) {
          console.log("User updated");
          $(".member-status").blur();
        } else alert("Update Failed!");
      })
      .catch((err) => {
        console.log(err);
        alert("Update Failed!");
      });
  });
});