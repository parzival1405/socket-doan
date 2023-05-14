let users = [];

const SocketServer = (socket, query) => {
  console.log("new connection");

  const HasUser = users.find((user1) => user1.id === query.id);
  if (HasUser) {
    users.map((user1) => {
      if (user1.id === query.id) {
        user1.socketId = socket.id;
      }
    });
  } else {
    users.push({
      id: query.id,
      role: query.role,
      socketId: socket.id,
    });
  }

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    console.log("hre")
  });

  socket.on("newMedicalExamination", (data) => {
    const data2 = JSON.parse(data);

    const client = users.find((user) => user.id === data2.doctor.id + "");
    if (client) {
      socket.to(`${client.socketId}`).emit("receiveMedicalExamination", data2);
    }
  });

  socket.on("sendMedicalLetter", (data) => {
    const data2 = JSON.parse(data);
    const client = users.find((user) => user.role === "RECEPTIONIST");
    if (client) {
      socket.to(`${client.socketId}`).emit("receiveMedicalLetter", data2);
    }
  });

  socket.on("doneServiceCLS", (data) => {
    const data2 = JSON.parse(data);
    const client = users.find((user) => user.id === data2.va.doctorId+ "");

    if (client) {
      socket.to(`${client.socketId}`).emit("receiveDoneServiceCLS", {
        data: data2.data,
        idMedicalExamination: data2.va.idMedicalExamination,
      });
    }
  });

  socket.on("servicePayment", (data) => {
    const data2 = JSON.parse(data);

    const client = users.filter((user) => user.role === "RECEPTIONIST");
    console.log("here", client);

    client.forEach((element, index) => {
      socket.to(`${element.socketId}`).emit("receiveServicePayment", data2);
    });
  });

  socket.on("sendMessage", (data) => {
    const data2 = JSON.parse(data);

    const client = users.filter((user) => user.role === "RECEPTIONIST");

    client.forEach((element, index) => {
      socket.to(`${element.socketId}`).emit("receiveMessage", data2);
    });
  });

  socket.on("receptionistSendMessage", (data) => {
    const data2 = JSON.parse(data);

    const client = users.find((user) => user.id === data2.customerId && user.role === "KHACH_HANG");
    console.log(client,data2)
    if (client) {
      socket.to(`${client.socketId}`).emit("customerReceiveMessage", data2);
    }
  });
};

module.exports = SocketServer;
