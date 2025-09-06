
export const post = (authorId, courseId, collegeId) => {
  return {
    content: "<h1><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem</span></h1><h2><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">dolor </span></h2><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem </span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">ipsum </em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">dolor sit amet, </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">consectetur </strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">adipiscing elit. Pellentesque sit amet eros sit amet sem commodo pretium. Mauris </span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">sed turpis at augue tempus</em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"> pretium ut vitae nisl. Vivamus vehicula velit vitae sollicitudin rutrum. Nullam a urna non nisl eleifend volutpat sit amet id ex. </span><s style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">In quis tempus libero</s><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">, eu sagittis nibh. Etiam scelerisque faucibus metus id tempus. Nulla facilisi. Sed fringilla tincidunt massa, id laoreet erat ultrices condimentum. Donec mattis, erat quis feugiat dapibus, lectus sapien blandit arcu, vel pharetra velit felis auctor diam. Nam a massa ac urna maximus bibendum nec placerat eros. Maecenas vitae odio id odio volutpat egestas. Maecenas eget turpis tellus. Phasellus porttitor, ex et dictum pretium, nisl metus faucibus diam, vitae faucibus enim nisi et lectus. Duis id sem facilisis, placerat sem et, vulputate nibh.</span></p><p></p><p>&lt;script&gt;alert(&quot;teste&quot;)&lt;/script&gt;</p><p></p><pre data-language=\"plain\">\nimport { Controller, Get } from &#39;@nestjs/common&#39;;\nimport { CalendarService } from &#39;./calendar.service&#39;;\n\n@Controller()\nexport class CalendarController {\n    constructor(private readonly calendarService: CalendarService) { }\n\n    @Get()\n    getHello(): string {\n        return this.calendarService.getHello();\n    }\n}\n</pre>",
    published: true,
    author: {
      connect: { id: Number(authorId) }
    },
    course: {
      connect: { id: Number(courseId) }
    },
    college: {
      connect: { id: Number(collegeId) }
    }
  }
}

export const post_link = (authorId, courseId, collegeId) => {
  return {
    content: "<h1><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem</span></h1><h2><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">dolor </span></h2><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem </span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">ipsum </em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">dolor sit amet, </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">consectetur </strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">adipiscing elit. Pellentesque sit amet eros sit amet sem commodo pretium. Mauris </span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">sed turpis at augue tempus</em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"> pretium ut vitae nisl. Vivamus vehicula velit vitae sollicitudin rutrum. Nullam a urna non nisl eleifend volutpat sit amet id ex. </span><s style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">In quis tempus libero</s><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">, eu sagittis nibh. Etiam scelerisque faucibus metus id tempus. Nulla facilisi. Sed fringilla tincidunt massa, id laoreet erat ultrices condimentum. Donec mattis, erat quis feugiat dapibus, lectus sapien blandit arcu, vel pharetra velit felis auctor diam. Nam a massa ac urna maximus bibendum nec placerat eros. Maecenas vitae odio id odio volutpat egestas. Maecenas eget turpis tellus. Phasellus porttitor, ex et dictum pretium, nisl metus faucibus diam, vitae faucibus enim nisi et lectus. Duis id sem facilisis, placerat sem et, vulputate nibh.</span></p><p></p><p>&lt;script&gt;alert(&quot;teste&quot;)&lt;/script&gt;</p><p></p><pre data-language=\"plain\">\nimport { Controller, Get } from &#39;@nestjs/common&#39;;\nimport { CalendarService } from &#39;./calendar.service&#39;;\n\n@Controller()\nexport class CalendarController {\n    constructor(private readonly calendarService: CalendarService) { }\n\n    @Get()\n    getHello(): string {\n        return this.calendarService.getHello();\n    }\n}\n</pre>",
    published: true,
    author: {
      connect: { id: Number(authorId) }
    },
    course: {
      connect: { id: Number(courseId) }
    },
    college: {
      connect: { id: Number(collegeId) }
    }
  }
}

export const post_image = (authorId, courseId, collegeId) => {
  return {
    content: "<h1><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem</span></h1><h2><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">dolor </span></h2><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem </span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">ipsum </em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">dolor sit amet, </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">consectetur </strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">adipiscing elit. Pellentesque sit amet eros sit amet sem commodo pretium. Mauris </span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">sed turpis at augue tempus</em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"> pretium ut vitae nisl. Vivamus vehicula velit vitae sollicitudin rutrum. Nullam a urna non nisl eleifend volutpat sit amet id ex. </span><s style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">In quis tempus libero</s><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">, eu sagittis nibh. Etiam scelerisque faucibus metus id tempus. Nulla facilisi. Sed fringilla tincidunt massa, id laoreet erat ultrices condimentum. Donec mattis, erat quis feugiat dapibus, lectus sapien blandit arcu, vel pharetra velit felis auctor diam. Nam a massa ac urna maximus bibendum nec placerat eros. Maecenas vitae odio id odio volutpat egestas. Maecenas eget turpis tellus. Phasellus porttitor, ex et dictum pretium, nisl metus faucibus diam, vitae faucibus enim nisi et lectus. Duis id sem facilisis, placerat sem et, vulputate nibh.</span></p><p></p><p>&lt;script&gt;alert(&quot;teste&quot;)&lt;/script&gt;</p><p></p><pre data-language=\"plain\">\nimport { Controller, Get } from &#39;@nestjs/common&#39;;\nimport { CalendarService } from &#39;./calendar.service&#39;;\n\n@Controller()\nexport class CalendarController {\n    constructor(private readonly calendarService: CalendarService) { }\n\n    @Get()\n    getHello(): string {\n        return this.calendarService.getHello();\n    }\n}\n</pre>",
    published: true,
    author: {
      connect: { id: Number(authorId) }
    },
    course: {
      connect: { id: Number(courseId) }
    },
    college: {
      connect: { id: Number(collegeId) }
    }
  }
}

export const post_seed_1 = (authorId, courseId, collegeId) => ({
  content: "<h2>Bem-vindo ao curso!</h2><p>Este é o primeiro post de boas-vindas para todos os alunos. Aproveitem o conteúdo!</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_2 = (authorId, courseId, collegeId) => ({
  content: "<h2>Dica de estudo</h2><p>Reserve um tempo diário para revisar o material e tirar dúvidas no fórum.</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_3 = (authorId, courseId, collegeId) => ({
  content: "<h2>Material complementar</h2><p>Confira o PDF anexo para aprofundar seus conhecimentos sobre o tema da semana.</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_4 = (authorId, courseId, collegeId) => ({
  content: "<h2>Enquete</h2><p>Qual tema você gostaria de ver nas próximas aulas? Responda nos comentários!</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_5 = (authorId, courseId, collegeId) => ({
  content: "<h2>Evento ao vivo</h2><p>Participe da nossa live na próxima sexta-feira às 19h. Link será enviado por e-mail.</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_6 = (authorId, courseId, collegeId) => ({
  content: "<h2>Atualização do curso</h2><p>Novos módulos foram adicionados! Acesse a plataforma para conferir.</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_7 = (authorId, courseId, collegeId) => ({
  content: "<h2>Parabéns!</h2><p>Parabenizamos todos que concluíram o primeiro módulo. Continuem assim!</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_8 = (authorId, courseId, collegeId) => ({
  content: "<h2>FAQ</h2><p>Confira as perguntas frequentes sobre o curso na seção de ajuda.</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_9 = (authorId, courseId, collegeId) => ({
  content: "<h2>Desafio da semana</h2><p>Resolva o exercício proposto e poste sua solução até domingo.</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});

export const post_seed_10 = (authorId, courseId, collegeId) => ({
  content: "<h2>Feedback</h2><p>Deixe seu feedback sobre o curso para que possamos melhorar ainda mais!</p>",
  published: true,
  author: { connect: { id: Number(authorId) } },
  course: { connect: { id: Number(courseId) } },
  college: { connect: { id: Number(collegeId) } }
});
