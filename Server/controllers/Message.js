import { io, getReceiverSocketId, userSocketMap } from "../socket/socket.js";
import sequelize from "../util/sequelize.js";
export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.userId;
    const senderId = req.user.id;

    const [user] = await sequelize.query(
      "SELECT id, email FROM users WHERE id = ?",
      { replacements: [receiverId], type: sequelize.QueryTypes.SELECT }
    );

    if (!user) {
      res.status(400).json({ error: "Receiver not found" });
      return;
    }

    // Tìm kiếm hoặc tạo mới một cuộc trò chuyện
    let [conversation] = await sequelize.query(
      "SELECT * FROM conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)",
      {
        replacements: [senderId, receiverId, receiverId, senderId],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!conversation) {
      const result = await sequelize.query(
        "INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)",
        { replacements: [senderId, receiverId] }
      );
      console.log("result", result);
      // Lấy ID của cuộc trò chuyện mới tạo
      conversation = { id: result };
    }

    // Tạo mới một tin nhắn
    console.log(conversation);
    const [newMessage] = await sequelize.query(
      "INSERT INTO messages (conversation_id, content, sender_id, sent_at) VALUES (?, ?, ?, NOW())",
      {
        replacements: [conversation.id, req.body.message, senderId],
        type: sequelize.QueryTypes.INSERT,
      }
    );
    console.log("newMessage", newMessage);

    console.log("conversation", conversation);
    console.log("email", user.email);
    userSocketMap;
    console.log("userSocketMap", userSocketMap);
    const receiverSocketId = getReceiverSocketId(user.email);
    console.log("receiverSocketId", receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        id: newMessage,
        conversation_id: conversation.id,
        content: req.body.message,
        sender_id: senderId,
        sent_at: new Date(),
      });
    }

    res.json({
      id: newMessage,
      conversation_id: conversation.id,
      content: req.body.message,
      sender_id: senderId,
      created_at: new Date(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getConversations = async (req, res) => {
  // try {
  //   //id of user get request
  //   const userId = req.user.id;
  //   //const users = await User.findAll();
  //   const conversations = await Conversation.findAll({
  //     where: {
  //       [Op.or]: [{ user2_id: req.user.id }, { user1_id: req.user.id }],
  //     },
  //   });
  //   const userPromises = conversations.map(async (conversation) => {
  //     // Xác định ID người dùng đối phương trong cuộc trò chuyện
  //     const otherUserId =
  //       conversation.user1_id === userId
  //         ? conversation.user2_id
  //         : conversation.user1_id;
  //     // Tìm người dùng đối phương
  //     const user = await User.findOne({
  //       where: {
  //         id: otherUserId,
  //       },
  //       attributes: ["id", "name", "email"],
  //     });
  //     // Trả về một đối tượng gồm idconversation và user
  //     return {
  //       id: conversation.id,
  //       user: user.toJSON(), // Chuyển đổi đối tượng user thành một plain object
  //     };
  //   });
  //   const usersWithConversations = await Promise.all(userPromises);
  //   res.json(usersWithConversations);
  // } catch (error) {
  //   res.status(400).json({ error });
  // }
  try {
    // ID của user gửi request
    const userId = req.user.id;

    // Tìm tất cả các cuộc trò chuyện mà user này tham gia
    const conversations = await sequelize.query(
      `SELECT * FROM conversations WHERE user1_id = ? OR user2_id = ?`,
      {
        replacements: [userId, userId],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log("conversations", conversations);

    const userPromises = conversations.map(async (conversation) => {
      // Xác định ID người dùng đối phương trong cuộc trò chuyện
      const otherUserId =
        conversation.user1_id === userId
          ? conversation.user2_id
          : conversation.user1_id;

      // Tìm người dùng đối phương
      const users = await sequelize.query(
        `SELECT id, name, email FROM users WHERE id = ?`,
        {
          replacements: [otherUserId],
          type: sequelize.QueryTypes.SELECT,
        }
      );

      const user = users[0];

      // Trả về một đối tượng gồm idconversation và user
      return {
        id: conversation.id,
        user: user, // Chuyển đổi đối tượng user thành một plain object
      };
    });

    const usersWithConversations = await Promise.all(userPromises);

    res.json(usersWithConversations);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal server error" });
  }
};

// export const getMessages = async (req, res) => {
//   try {
//     const { conversationId } = req.params;

//     const messages = await Message.findAll({
//       attributes: ["content", "sender_id", "sent_at"],
//       where: {
//         conversation_id: conversationId,
//       },
//     });
//     res.json(messages);
//   } catch (error) {
//     console.log("dat");
//     console.log(error);
//     res.status(500).json("internal server error send message");
//   }
// };
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID is required" });
    }

    const messages = await sequelize.query(
      `SELECT content, sender_id, sent_at FROM messages WHERE conversation_id = ?`,
      {
        replacements: [conversationId],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log(messages);
    res.json(messages);
  } catch (error) {
    console.log("Error fetching messages");
    console.log(error);
    res.status(500).json("Internal server error fetching messages");
  }
};

// export const findConversationByUserName = async (req, res) => {
//   try {
//     const { username } = req.params;

//     const user = await User.findOne({
//       where: {
//         name: username,
//       },
//     });
//     console.log("user", user);
//     if (!user) {
//       return res.status(404).json({ error: "User Not found" });
//     }
//     console.log("req.user.id", req.user.id);
//     console.log("user.id", user.id);
//     let conversation = await Conversation.findOne({
//       where: {
//         [Op.or]: [
//           { user2_id: req.user.id, user1_id: user.id },
//           { user1_id: user.id, user2_id: req.user.id },
//         ],
//       },
//     });
//     console.log("conversation", conversation);
//     if (!conversation) {
//       conversation = await Conversation.create({
//         user1_id: req.user.id,
//         user2_id: user.id,
//       });
//     }
//     res.json(conversation);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const findConversationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Tìm user dựa trên username
    const users = await sequelize.query(`SELECT * FROM users WHERE id = ?`, {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT,
    });
    console.log("users", users);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ error: "User Not found" });
    }
    console.log(user);
    // Tìm conversation dựa trên user_id
    const conversations = await sequelize.query(
      `SELECT * FROM conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)`,
      {
        replacements: [req.user.id, user.id, user.id, req.user.id],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let conversation = conversations[0];

    if (!conversation) {
      // Tạo mới conversation nếu chưa có
      const result = await sequelize.query(
        `INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?) `,
        {
          replacements: [req.user.id, user.id],
          type: sequelize.QueryTypes.INSERT,
        }
      );
      conversation = result[0];
      console.log("conversation", conversation);
      return res.json({
        id: result[0],
        user,
      });
    }
    res.json({ id: conversation.id, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
