// html for message to add

export default function msgHTML(from, message, time, left=false) {
    const body = `
    <li class="list-unstyled mb-4 ${left?'text-right':'text-left'}">
      <div class="h6 mb-1 px-1">
        ${from}
      </div>
      <div  class="border rounded-lg bg-white d-inline-block pt-3" style="max-width: 80%">
        <div class="mx-3 h6 font-weight-normal">
          ${message}
        </div>
        <div class="small pt-1 px-1 pb-1">
          ${time}
        </div>
      </div>
    </li>
    `;
    return body;
}