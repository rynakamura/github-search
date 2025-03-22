import { render, screen, fireEvent } from "@testing-library/react";
import ConnectionModal from "../Modal";

describe("ConnectionModal", () => {
  it("deve renderizar o modal quando isOpen for true", () => {
    render(<ConnectionModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText("Conexão perdida")).toBeInTheDocument();
    expect(
      screen.getByText("Você está offline. Você ainda terá acesso a lista de perfis acessados. Verifique a internet para voltar a pesquisar novos perfis!")
    ).toBeInTheDocument();
  });

  it("deve fechar o modal quando o botão 'Entendi' for clicado", () => {
    const onCloseMock = jest.fn();
    render(<ConnectionModal isOpen={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByText("Entendi"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("não deve renderizar o modal quando isOpen for false", () => {
    render(<ConnectionModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText("Conexão perdida")).not.toBeInTheDocument();
  });
});