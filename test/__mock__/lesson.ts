export const lesson_with_link = (authorId, courseId) => {
  return {
    title: "Tratamento de erros no front com Angular",
    description: "Tratamento de erros no front com Angular",
    urlContent: "3a7c2d29ed2a5efb1465709f14688f83",
    author: {
      connect: { id: Number(authorId) }
    },
    course: {
      connect: { id: Number(courseId) }
    }
  }
}

export const lesson_with_content = (authorId, courseId) => {
  return {
    title: "Abelhas e Moscas",
    description: "elhas e Moscas -  Sid - Tema",
    urlContent: "https://www.youtube.com/watch?v=ZoOWEovfy2M&list=RDGMEM2VCIgaiSqOfVzBAjPJm-agVMytHxB1JOhoI&index=5",
    content: "<h1><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem</span></h1><h2><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">dolor </span></h2><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem </span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">ipsum </em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">dolor sit amet, </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">consectetur </strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">adipiscing elit. Pellentesque sit amet eros sit amet sem commodo pretium. Mauris </span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">sed turpis at augue tempus</em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"> pretium ut vitae nisl. Vivamus vehicula velit vitae sollicitudin rutrum. Nullam a urna non nisl eleifend volutpat sit amet id ex. </span><s style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">In quis tempus libero</s><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">, eu sagittis nibh. Etiam scelerisque faucibus metus id tempus. Nulla facilisi. Sed fringilla tincidunt massa, id laoreet erat ultrices condimentum. Donec mattis, erat quis feugiat dapibus, lectus sapien blandit arcu, vel pharetra velit felis auctor diam. Nam a massa ac urna maximus bibendum nec placerat eros. Maecenas vitae odio id odio volutpat egestas. Maecenas eget turpis tellus. Phasellus porttitor, ex et dictum pretium, nisl metus faucibus diam, vitae faucibus enim nisi et lectus. Duis id sem facilisis, placerat sem et, vulputate nibh.</span></p><p></p><p>&lt;script&gt;alert(&quot;teste&quot;)&lt;/script&gt;</p><p></p><pre data-language=\"plain\">\nimport { Controller, Get } from &#39;@nestjs/common&#39;;\nimport { CalendarService } from &#39;./calendar.service&#39;;\n\n@Controller()\nexport class CalendarController {\n    constructor(private readonly calendarService: CalendarService) { }\n\n    @Get()\n    getHello(): string {\n        return this.calendarService.getHello();\n    }\n}\n</pre>",
    author: {
      connect: { id: Number(authorId) }
    },
    course: {
      connect: { id: Number(courseId) }
    }
  }
}
