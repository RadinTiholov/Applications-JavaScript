export const deleteView = async (ctx) => {
    if (confirm("Do you want to delete it?") == true) { 
        const id = ctx.params.id;
        await ctx.data.del(id);
        ctx.page.redirect('/');
    }
}