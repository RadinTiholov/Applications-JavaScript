export const deleteView = async (ctx) => {
    const id = ctx.params.id;
    confirm("Do you want to delete the item?");
    await ctx.data.del(id);
    ctx.page.redirect('/');
}