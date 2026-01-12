(function () {
    $("a[download]").on("click", function (e) {
        e.preventDefault();

        const fileUrl = $(this).attr("href");
        const fileName = $(this).attr("download");
        if (!fileName) {
            console.log("File not found!");
        }

        $.ajax({
            url: fileUrl,
            method: "GET",
            xhrFields: {
                responseType: "blob",
            },
            success: function (data) {
                const blob = new Blob([data]);
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            },
        });
    });
})();
