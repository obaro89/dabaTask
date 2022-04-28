const Query = {
  async profile(parent, args, ctx, info) {
    console.log(args.id);
    return {
      id: args.id,
      name: "user",
      username: "username",
      email: "email",
    };
  },
};

export { Query as default };
